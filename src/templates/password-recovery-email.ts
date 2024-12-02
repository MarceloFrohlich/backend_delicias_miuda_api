export const generateEmailHtml = (username: string, token: string) =>
  `<!DOCTYPE html>
<html>

<head>
    <title>Redefinição de Senha - VelaPlus</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 10; padding: 0;">
    <table width="100%" bgcolor="#f4f4f4" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td>
                <table width="600" bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" border="0"
                    style="margin: 0 auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 8px;">
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <img src="https://site-vela.s3.sa-east-1.amazonaws.com/image2.jpeg"
                                alt="vela Logo" style="max-width: 100%; height: auto;">
                            <h1 style="margin: 20px 0;">Redefinição de Senha</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; color: #000000;">
                            <p>Olá ${username}!</p>
                            <p>Recebemos uma solicitação para redefinir a senha da sua conta.</p>
                            <p>Clique no botão abaixo para ser redirecionado à tela de redefinição de senha:</p>
                            <div style="display: flex; justify-content: center;">
                                <a href="https://novo-site-vela.vercel.app/${token}" target="_blank" 
                                style="border: none; border-radius: 8px; width: 250px; height: 50px; font-size: 20px;
                                    background-color: #fab40c; cursor: pointer; text-decoration: none; display: flex;
                                    justify-content: center; align-items: center; color: black;
                                ">
                                Redefinir
                            </a>
                            </div>
                            <p>Se você não solicitou a redefinição de senha, por favor, ignore este email.</p>
                            <div style="text-align: center;">

                            </div>
                            <p>Este link é válido por 10 minutos.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" bgcolor="#f1f1f1" style="padding: 10px; font-size: 12px; color: #777;">
                            <img src="https://site-vela.s3.sa-east-1.amazonaws.com/image1.jpeg"
                                alt="Footer Image" style="max-width: 100%; height: auto; width: 100%;">
                            <p>Se você não solicitou esta redefinição de senha, por favor ignore este email.</p>
                            <p>&copy; 2024 VelaPlus. Todos os direitos reservados.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`;
