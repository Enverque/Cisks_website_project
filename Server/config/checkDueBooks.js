import Students from "../models/Reg_students.js";
import transporter from "./mailer.js";

export default async function checkDueBooks() {
  const now = new Date();
  
  try {
    const students = await Students.aggregate([
      { $unwind: "$issuedBooks" },
      {
        $match: {
          "issuedBooks.returned": false,
          "issuedBooks.reminderSent": false,
          "issuedBooks.dueDate": {
            $lte: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // Books due within 2 days
            $gt: now // But not overdue yet
          }
        }
      },
      { 
        $group: { 
          _id: "$_id", 
          issuedBooks: { $push: "$issuedBooks" }, 
          email: { $first: "$username" },
          name: { $first: "$name" } 
        }
      }
    ]);

    console.log(`[CRON] Found ${students.length} students with due books`);

    let sentCount = 0;
    for (const student of students) {
      for (const book of student.issuedBooks) {
        const timeRemaining = book.dueDate - now;
        const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));        
        const mailOptions = {
          from: `CISKS Library <${process.env.EMAIL_USER}>`,
          to: student.email,
          subject: 'Book Due Date Reminder',
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <div>Hi ${student.name},</div> 
              <p>This is a reminder that your book <strong>"${book.Book_title}"</strong> is due soon:</p>
              <ul>
                <li><strong>Due Date:</strong> ${new Date(book.dueDate).toLocaleString()}</li>
                <li><strong>Time Remaining:</strong> ${daysRemaining} days and ${hoursRemaining} hours</li>              
              </ul>
              <p>Please return or renew the book before the due date to avoid penalties.</p>
              <p style="margin-top: 30px; color: #666;">
                Best regards,<br>
                CISKS Library Team
              </p>
            </div>
          `
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log(`[CRON] Reminder sent to ${student.email} for book "${book.Book_title}"`);

          await Students.updateOne(
            { _id: student._id, "issuedBooks.bookId": book.bookId },
            { $set: { "issuedBooks.$.reminderSent": true } }
          );
          
          sentCount++;
        } catch (emailError) {
          console.error(`[CRON] Failed to send reminder to ${student.email}:`, emailError);
        }
      }
    }
    
    console.log(`[CRON] Sent ${sentCount} reminders in total`);
    return { success: true, remindersSent: sentCount };
  } catch (error) {
    console.error("[CRON] Error checking due books:", error);
    return { error: "Internal server error", details: error.message };
  }
}
