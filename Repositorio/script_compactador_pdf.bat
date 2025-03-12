@echo off
cls
echo 'Compactando os arquivos pdf para o arquivo compactados.zip'

tar -cf pdfs_capactado.zip *.pdf

move pdfs_capactado.zip .\backup

dir .\backup

tar -tf .\backup\pdfs_capactado.zip
