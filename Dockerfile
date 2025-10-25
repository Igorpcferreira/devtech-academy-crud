# Imagem base leve do Nginx
FROM nginx:alpine

# Copia todos os arquivos do projeto para a pasta padrão do Nginx
COPY . /usr/share/nginx/html

# Expõe a porta padrão do Nginx
EXPOSE 80

# Mantém o Nginx rodando
CMD ["nginx", "-g", "daemon off;"]
