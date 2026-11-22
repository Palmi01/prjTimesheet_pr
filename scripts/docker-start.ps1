
Write-Host "Avvio PRJTIMESHEET_PR..."

docker compose up -d --build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Errore durante l'avvio Docker"
    exit 1
}

Write-Host ""
Write-Host "Applicazione avviata."
Write-Host "Frontend: http://localhost:4200"
Write-Host "Backend : http://localhost:8080"
Write-Host "MySQL   : localhost:3307"
