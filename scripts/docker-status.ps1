

Write-Host "Stato container PRJTIMESHEET_PR"

docker compose ps

Write-Host ""
Write-Host "Ultimi log applicativi"

docker compose logs --tail=50
