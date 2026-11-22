
# ==========================================
# BUILD STAGE
# ==========================================

FROM gradle:8.13-jdk21 AS build

WORKDIR /workspace

COPY . .

RUN chmod +x gradlew

RUN ./gradlew clean bootJar --no-daemon

# Individua il JAR eseguibile, escludendo quello plain
RUN JAR_FILE=$(find build/libs -maxdepth 1 -type f -name "*.jar" ! -name "*-plain.jar" -print -quit) \
    && test -n "$JAR_FILE" \
    && cp "$JAR_FILE" app.jar


# ==========================================
# RUNTIME STAGE
# ==========================================

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /workspace/app.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
