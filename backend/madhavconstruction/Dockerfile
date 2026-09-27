FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /workspace

COPY backend/madhavconstruction/pom.xml ./pom.xml
COPY backend/madhavconstruction/src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /workspace/target/app.jar ./app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "/app/app.jar"]