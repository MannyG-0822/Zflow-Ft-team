FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY about-us.html /usr/share/nginx/html/
COPY our-services.html /usr/share/nginx/html/
COPY case-study-crm.html /usr/share/nginx/html/
COPY case-study-engineering.html /usr/share/nginx/html/
COPY case-study-marketing.html /usr/share/nginx/html/
COPY case-study-pm.html /usr/share/nginx/html/
COPY privacy-policy.html /usr/share/nginx/html/
COPY terms.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY assets/ /usr/share/nginx/html/assets/

# Expose port 8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
