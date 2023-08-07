# Frontend Dockerfile

# 기반이 되는 이미지
FROM node:14

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 파일 복사
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 빌드
RUN npm run build

# 빌드된 파일 제외한 나머지 파일 삭제 (옵션)
RUN rm -rf node_modules

# 실행할 명령어
CMD ["npm", "start"]