cls
@echo off
echo Compactando Arquivos

tar -cf notas.zip *.xml 2> erros.txt

IF %ERRORLEVEL% NEQ 0 (echo "Erro na execução do script")

move notas.zip .\backup 