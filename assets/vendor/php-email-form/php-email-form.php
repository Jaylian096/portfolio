<?php
// Include the PHPMailer class files
require_once('C:/xampp/htdocs/myportfolio/PHPMailer/PHPMailer.php');
require_once('C:/xampp/htdocs/myportfolio/PHPMailer/Exception.php');
require_once('C:/xampp/htdocs/myportfolio/PHPMailer/SMTP.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if (isset($_POST['name'], $_POST['email'], $_POST['subject'], $_POST['message'])) {

    // Create an instance of PHPMailer
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'jaylianbacolod096@gmail.com'; // Your Gmail account
        $mail->Password = 'cdlb wzbl cnxq wzmu'; // App password for 2FA
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587; // Use 465 for SSL
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );

        // Set the "From" address to your Gmail (static), but the name will be dynamic (Jaylian Bacolod)
        $mail->setFrom('jaylianbacolod096@gmail.com', 'Jaylian Bacolod'); // Sender (static)

        // Set the "Reply-To" address to the form submitter's email
        $mail->addReplyTo($_POST['email'], $_POST['name']); // This is dynamic, based on the form submission

        // Recipient email address (Where the email will be sent)
        $mail->addAddress('jaylianbacolod096@gmail.com'); // This is where the form message goes

        // Content of the email
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = $_POST['subject'];                    // Subject of the email
        $mail->Body    = 'From: ' . $_POST['name'] . '<br>Email: ' . $_POST['email'] . '<br>Message: ' . $_POST['message'];  // The body of the email

        // Send the email
        if ($mail->send()) {
            // Show success message
            echo '<div style="background-color: #4CAF50; color: white; padding: 15px; text-align: center;">
                    Message has been sent successfully!
                  </div>';
        }

    }catch (Exception $e) {
        // Log the error or perform other actions without displaying the message
        // For example, logging to a file
        error_log("Message could not be sent. Mailer Error: " . $mail->ErrorInfo);
    
        // Or you can leave it empty to silently handle the error
        // Do nothing here
    }
} else {
    // If fields are missing, show an error message
    echo '<div style="background-color: #f44336; color: white; padding: 15px; text-align: center;">
            Please fill in all fields!
          </div>';
}
?>
