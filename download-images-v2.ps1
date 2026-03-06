# Script PowerShell pour télécharger des images depuis Unsplash API

# URLs Unsplash plus simples et directes
$imageUrls = @{
    "data-science" = "https://source.unsplash.com/featured/?data-science"
    "python" = "https://source.unsplash.com/featured/?python"
    "react" = "https://source.unsplash.com/featured/?react"
    "excel" = "https://source.unsplash.com/featured/?excel"
    "cybersecurity" = "https://source.unsplash.com/featured/?cybersecurity"
    "blockchain" = "https://source.unsplash.com/featured/?blockchain"
    "ai-ml" = "https://source.unsplash.com/featured/?machine-learning"
    "web-design" = "https://source.unsplash.com/featured/?web-design"
    "bi-dashboard" = "https://source.unsplash.com/featured/?dashboard"
}

# Créer le répertoire assets s'il n'existe pas
$assetsPath = "public\assets"
if (-not (Test-Path $assetsPath)) {
    New-Item -ItemType Directory -Path $assetsPath -Force
}

# Fonction pour télécharger une image aléatoire depuis Unsplash
function Download-UnsplashImage {
    param(
        [string]$category,
        [string]$fileName
    )
    
    try {
        # Obtenir une image aléatoire de la catégorie
        $response = Invoke-RestMethod -Uri "https://api.unsplash.com/photos/random" -Method Get -Headers @{"Accept"="application/json"} -TimeoutSec 30
        $data = $response.Content | ConvertFrom-Json
        
        # Télécharger l'image
        $imageUrl = $data.urls.regular
        $filePath = Join-Path $assetsPath $fileName
        
        Write-Host "Téléchargement de $fileName depuis Unsplash..."
        Invoke-WebRequest -Uri $imageUrl -OutFile $filePath -TimeoutSec 30
        
        Write-Host "✅ $fileName téléchargé avec succès" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ Erreur lors du téléchargement de $fileName" -ForegroundColor Red
        return $false
    }
}

# Télécharger une image pour chaque catégorie
$successCount = 0
$totalCount = $imageUrls.Count

foreach ($category in $imageUrls.Keys) {
    $fileName = "$category.jpg"
    
    if (Download-UnsplashImage -category $category -fileName $fileName) {
        $successCount++
    }
}

Write-Host "`nTéléchargement terminé: $successCount/$totalCount images téléchargées avec succès" -ForegroundColor Cyan

if ($successCount -gt 0) {
    Write-Host "Les images ont été téléchargées et sont prêtes à être utilisées!" -ForegroundColor Green
} else {
    Write-Host "Aucune image n'a pu être téléchargée. Utilisation des images existantes." -ForegroundColor Yellow
}
