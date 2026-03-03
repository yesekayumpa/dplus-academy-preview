# Configuration de l'envoi d'emails - DM Plus Academy

## 📧 Fonctionnalité d'envoi d'emails

Le système d'inscription envoie automatiquement un email à `academy@dmplus-group.com` lorsqu'un utilisateur complète le formulaire d'inscription.

## 🛠️ Configuration requise

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Configuration email (choisissez l'une des options ci-dessous)

# Option 1: Resend (recommandé)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=academy@dmplus-group.com

# Option 2: SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=academy@dmplus-group.com

# Option 3: Brevo (anciennement Sendinblue)
BREVO_API_KEY=your_brevo_api_key
BREVO_FROM_EMAIL=academy@dmplus-group.com
```

### 2. Installation des dépendances

```bash
# Pour Resend
npm install resend

# Pour SendGrid
npm install @sendgrid/mail

# Pour Brevo
npm install sib-api-v3-sdk
```

## 🔧 Modification du fichier API

Modifiez `src/app/api/send-email/route.ts` pour utiliser votre service d'email :

### Option 1: Resend (recommandé)

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { to, subject, html } = await request.json();

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      throw new Error(error.message);
    }

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

### Option 2: SendGrid

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request: Request) {
  try {
    const { to, subject, html } = await request.json();

    const msg = {
      to: to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: subject,
      html: html,
    };

    await sgMail.send(msg);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

### Option 3: Brevo

```typescript
import SibApiV3Sdk from 'sib-api-v3-sdk';

const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

export async function POST(request: Request) {
  try {
    const { to, subject, html } = await request.json();

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.sender = { email: process.env.BREVO_FROM_EMAIL };
    sendSmtpEmail.to = [{ email: to }];

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

## 📋 Contenu de l'email

L'email envoyé contient :

- **Informations générales** : Date de soumission, type de formulaire
- **Informations personnelles** : Nom, email, téléphone, adresse, profession, statut
- **Compétences techniques** : Outils maîtrisés, autres outils
- **Niveaux de compétence** : Programmation, Excel, R, Shiny, etc.
- **Attentes et objectifs** : Si spécifiés
- **Confirmation de participation** : Édition 2

L'email est envoyé au format HTML et texte pour une compatibilité maximale.

## 🚀 Déploiement

### Vercel

1. Ajoutez les variables d'environnement dans le dashboard Vercel
2. Déployez votre application

### Autres plateformes

Assurez-vous que les variables d'environnement sont correctement configurées sur votre plateforme d'hébergement.

## 🧪 Test local

Pour tester localement, vous pouvez utiliser un service comme [Mailtrap](https://mailtrap.io) ou [Ethereal Email](https://ethereal.email) :

```env
# Pour Mailtrap
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_user
SMTP_PASS=your_mailtrap_pass
```

## 📊 Monitoring

- Les logs d'envoi sont disponibles dans la console du développeur
- En cas d'erreur, une notification est affichée à l'utilisateur
- Les erreurs sont aussi loggées pour le débogage

## 🔒 Sécurité

- L'API endpoint est protégé contre les requêtes non autorisées
- Les données sont validées avant l'envoi
- Les clés API ne sont jamais exposées côté client

## 📞 Support

En cas de problème avec l'envoi d'emails :

1. Vérifiez les logs de votre service d'email
2. Confirmez que les variables d'environnement sont correctes
3. Testez avec un service d'email de test

---

**Note importante** : En développement, l'API simule l'envoi d'email et affiche les données dans la console. En production, assurez-vous de configurer un vrai service d'email.
