import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendNewsletterConfirmation = async (email: string) => {
    try {
        const mailOptions = {
            from: `"TerraQuest Newsletter" <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: 'Potwierdzenie zapisu na newsletter',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2C2C2C;">Dziękujemy za zapis na newsletter TerraQuest!</h2>
                    <p>Twój adres e-mail (${email}) został zapisany do naszej bazy subskrybentów.</p>
                    <p>Będziesz otrzymywać od nas:</p>
                    <ul>
                        <li>Najnowsze promocje</li>
                        <li>Ekskluzywne oferty</li>
                        <li>Informacje o nowych atrakcjach</li>
                    </ul>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #777;">
                        Jeśli to nie Ty się zapisałeś/aś, prosimy zignoruj tę wiadomość.<br>
                        <a href="${process.env.BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}" 
                           style="color: #777;">Wypisz się z newslettera</a>
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Wysłano potwierdzenie na: ${email}`);
        return true;
    } catch (error) {
        console.error('Błąd wysyłania e-maila:', error);
        throw new Error('Wystąpił błąd podczas wysyłania potwierdzenia');
    }
};