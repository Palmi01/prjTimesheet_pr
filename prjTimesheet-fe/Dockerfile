
# ==========================================
# BUILD STAGE
# ==========================================

FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build -- --configuration production

# Prepara la cartella da pubblicare
RUN mkdir -p /site \
    && if [ -f dist/frontend/browser/index.html ]; then \
         cp -a dist/frontend/browser/. /site/; \
       elif [ -f dist/frontend/index.html ]; then \
         cp -a dist/frontend/. /site/; \
       else \
         echo "ERRORE: index.html non trovato nella build Angular"; \
         find dist -maxdepth 4 -type f; \
         exit 1; \
       fi


# ==========================================
# RUNTIME STAGE
# ==========================================

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /site/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
