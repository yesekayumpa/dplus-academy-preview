# Script PowerShell pour télécharger des images depuis Unsplash

# URLs des images pour chaque catégorie
$imageUrls = @{
    "data-science" = "https://images.unsplash.com/photo-1551288049410-d5555a3280d5?w=800&h=600&fit=crop&crop=entropy&auto=format"
    "python" = "https://images.unsplash.com/photo-1526379095085-194d07a6d3d0?w=800&h=600&fit=crop&crop=entropy&auto=format"
    "react" = "https://images.unsplash.com/photo-1633356124945-c6b0e493c332?w=800&h=600&fit=crop&crop=entropy&auto=format"
    "excel" = "https://images.unsplash.com/photo-1554228827-6ac6ecb2ebee?w=800&h=600&fit=crop&crop=entropy&auto=format"
    "bi-dashboard" = "https://images.unsplash.com/photo-1551288049410-d5555a3280d5?w=800&h=600&fit=crop&crop=entropy&auto=format"
    "cybersecurity" = "https://images.unsplash.com/photo-1563013544-824ae1c704d3?w=800&h=600&fit=crop&crop=entropy&auto=format"
    "blockchain" = "https://images.unsplash.com/photo-1639762665287-615a6c5b415?w=800&h=600&fit=crop&crop=entropy&auto=format"
    "ai-ml" = "https://images.unsplash.com/photo-1677440105736-dd6003f1c77c?w=800&h=600&fit=crop&crop=entropy&auto=format"
    "web-design" = "https://images.unsplash.com/photo-1507230822508-ec2364ff581?w=800&h=600&fit=crop&crop=entropy&auto=format"
}

# Créer le répertoire assets s'il n'existe pas
$assetsPath = "public\assets"
if (-not (Test-Path $assetsPath)) {
    New-Item -ItemType Directory -Path $assetsPath -Force
}

# Télécharger chaque image
foreach ($category in $imageUrls.Keys) {
    $url = $imageUrls[$category]
    $fileName = "$category.jpg"
    $filePath = Join-Path $assetsPath $fileName
    
    Write-Host "Téléchargement de $fileName..."
    
    try {
        # Utiliser Invoke-WebRequest avec -UseBasicParsing pour éviter les problèmes SSL
        Invoke-WebRequest -Uri $url -OutFile $filePath -UseBasicParsing -TimeoutSec 30
        Write-Host "✅ $fileName téléchargé avec succès" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Erreur lors du téléchargement de $fileName" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}

Write-Host "Téléchargement terminé!" -ForegroundColor Cyan
