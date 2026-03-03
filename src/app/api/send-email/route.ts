// API endpoint pour l'envoi d'email
// Ce fichier simule un backend - en production, vous devriez utiliser un vrai service d'email

export async function POST(request: Request) {
  try {
    const { to, subject, formData } = await request.json();

    // Validation des données
    if (!to || !subject || !formData) {
      return Response.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Créer le contenu de l'email au format HTML
    const emailContent = createEmailContent(formData, subject);

    // Options pour l'email
    const emailOptions = {
      to: to,
      subject: subject,
      html: emailContent,
      text: createTextEmailContent(formData, subject)
    };

    // EN PRODUCTION: Utiliser un vrai service d'email comme:
    // - Resend, SendGrid, Nodemailer, Brevo, etc.
    // Pour la démo, nous simulons l'envoi
    
    console.log('=== EMAIL A ENVOYER ===');
    console.log('Destinataire:', to);
    console.log('Sujet:', subject);
    console.log('Contenu HTML:', emailContent);
    console.log('===================');

    // Simulation d'envoi réussi
    // En production, remplacez ce code par un vrai appel API:
    /*
    // Exemple avec Resend:
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const { data, error } = await resend.emails.send({
      from: 'academy@dmplus-group.com',
      to: [to],
      subject: subject,
      html: emailContent,
    });

    if (error) {
      throw new Error(error.message);
    }
    */

    // Simulation d'un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 1000));

    return Response.json(
      { 
        success: true, 
        message: 'Email envoyé avec succès',
        data: {
          to: to,
          subject: subject,
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return Response.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}

function createEmailContent(formData: any, subject: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #8B0000, #DC143C);
          color: white;
          padding: 20px;
          margin: -30px -30px 30px -30px;
          border-radius: 10px 10px 0 0;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section h2 {
          color: #8B0000;
          border-bottom: 2px solid #DC143C;
          padding-bottom: 5px;
          margin-bottom: 15px;
          font-size: 18px;
        }
        .field {
          margin-bottom: 10px;
          padding: 8px;
          background: #f9f9f9;
          border-radius: 5px;
        }
        .field strong {
          color: #333;
          display: inline-block;
          min-width: 150px;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
        .badge {
          background: #DC143C;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎓 DM Plus Academy</h1>
          <p>Nouvelle inscription Masterclass</p>
        </div>

        <div class="section">
          <h2>📋 Informations générales</h2>
          <div class="field">
            <strong>Date de soumission:</strong> ${formData.submittedAt}
          </div>
          <div class="field">
            <strong>Type de formulaire:</strong> <span class="badge">${formData.formType}</span>
          </div>
        </div>

        <div class="section">
          <h2>👤 Informations personnelles</h2>
          <div class="field">
            <strong>Nom et prénom:</strong> ${formData.nomPrenom}
          </div>
          <div class="field">
            <strong>Email:</strong> ${formData.email}
          </div>
          <div class="field">
            <strong>Téléphone:</strong> ${formData.telephone}
          </div>
          <div class="field">
            <strong>Adresse:</strong> ${formData.adresse}
          </div>
          <div class="field">
            <strong>Profession:</strong> ${formData.profession}
          </div>
          <div class="field">
            <strong>Statut:</strong> ${formData.statut === 'etudiant' ? 'Étudiant' : 'Professionnel'}
          </div>
        </div>

        <div class="section">
          <h2>💻 Compétences techniques</h2>
          <div class="field">
            <strong>Outils maîtrisés:</strong> ${formData.outils.join(', ')}
          </div>
          ${formData.autreOutil ? `
          <div class="field">
            <strong>Autre outil:</strong> ${formData.autreOutil}
          </div>
          ` : ''}
          ${formData.autreOutilApprendre ? `
          <div class="field">
            <strong>Outil à apprendre:</strong> ${formData.autreOutilApprendre}
          </div>
          ` : ''}
        </div>

        <div class="section">
          <h2>📊 Niveaux de compétence</h2>
          <div class="field">
            <strong>Programmation:</strong> ${getNiveauLabel(formData.niveauProgrammation)}
          </div>
          <div class="field">
            <strong>Excel:</strong> ${getNiveauExcelLabel(formData.niveauExcel)}
          </div>
          ${formData.niveauR ? `
          <div class="field">
            <strong>Langage R:</strong> ${getNiveauLabel(formData.niveauR)}
          </div>
          ` : ''}
          ${formData.connaitShiny ? `
          <div class="field">
            <strong>Connaît Shiny:</strong> ${formData.connaitShiny}
          </div>
          ` : ''}
          ${formData.experienceProvisionnement ? `
          <div class="field">
            <strong>Expérience provisionnement:</strong> ${formData.experienceProvisionnement}
          </div>
          ` : ''}
        </div>

        ${formData.attentes ? `
        <div class="section">
          <h2>🎯 Attentes et objectifs</h2>
          <div class="field">
            <strong>Attentes:</strong><br>
            ${formData.attentes.replace(/\n/g, '<br>')}
          </div>
        </div>
        ` : ''}

        <div class="section">
          <h2>✅ Participation</h2>
          <div class="field">
            <strong>Participation édition 2:</strong> ${formData.participeEdition2}
          </div>
        </div>

        <div class="footer">
          <p><strong>DM Plus Academy</strong></p>
          <p>Email: academy@dmplus-group.com</p>
          <p>Cet email a été généré automatiquement depuis le formulaire d'inscription</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function createTextEmailContent(formData: any, subject: string): string {
  return `
DM Plus Academy - ${subject}
=====================================

INFORMATIONS GÉNÉRALES
----------------------
Date de soumission: ${formData.submittedAt}
Type de formulaire: ${formData.formType}

INFORMATIONS PERSONNELLES
--------------------------
Nom et prénom: ${formData.nomPrenom}
Email: ${formData.email}
Téléphone: ${formData.telephone}
Adresse: ${formData.adresse}
Profession: ${formData.profession}
Statut: ${formData.statut === 'etudiant' ? 'Étudiant' : 'Professionnel'}

COMPÉTENCES TECHNIQUES
-----------------------
Outils maîtrisés: ${formData.outils.join(', ')}
${formData.autreOutil ? `Autre outil: ${formData.autreOutil}` : ''}
${formData.autreOutilApprendre ? `Outil à apprendre: ${formData.autreOutilApprendre}` : ''}

NIVEAUX DE COMPÉTENCE
----------------------
Programmation: ${getNiveauLabel(formData.niveauProgrammation)}
Excel: ${getNiveauExcelLabel(formData.niveauExcel)}
${formData.niveauR ? `Langage R: ${getNiveauLabel(formData.niveauR)}` : ''}
${formData.connaitShiny ? `Connaît Shiny: ${formData.connaitShiny}` : ''}
${formData.experienceProvisionnement ? `Expérience provisionnement: ${formData.experienceProvisionnement}` : ''}

${formData.attentes ? `
ATTENTES ET OBJECTIFS
----------------------
${formData.attentes}
` : ''}

PARTICIPATION
-------------
Participation édition 2: ${formData.participeEdition2}

---
DM Plus Academy
Email: academy@dmplus-group.com
Cet email a été généré automatiquement depuis le formulaire d'inscription
  `;
}

function getNiveauLabel(niveau: string): string {
  const labels: Record<string, string> = {
    'debutant': 'Débutant',
    'intermediaire1': 'Intermédiaire 1',
    'intermediaire2': 'Intermédiaire 2',
    'avance': 'Avancé'
  };
  return labels[niveau] || niveau;
}

function getNiveauExcelLabel(niveau: string): string {
  const labels: Record<string, string> = {
    'basique': 'Basique',
    'intermediaire': 'Intermédiaire',
    'avance': 'Avancé'
  };
  return labels[niveau] || niveau;
}
