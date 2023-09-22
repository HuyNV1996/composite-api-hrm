# Sử dụng node image phiên bản 14.17.6
FROM node:14.17.6

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và yarn.lock vào thư mục /app
COPY package.json yarn.lock ./

# Cài đặt dependencies
RUN yarn install

# Sao chép các file còn lại vào thư mục /app
COPY . .
# Build dự án
RUN yarn build
# Khởi chạy ứng dụng
CMD ["yarn", "serve"]
# Expose cổng 3001 (nếu dự án của bạn chạy trên cổng khác, hãy sửa cổng dưới đây)
EXPOSE 4173

