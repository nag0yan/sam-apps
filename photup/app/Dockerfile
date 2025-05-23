FROM public.ecr.aws/lambda/nodejs:22 AS builder
ARG FEATURE
RUN test -n "${FEATURE}" || (echo "FEATURE must be set" && exit 1)
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app
COPY scripts/ scripts/
COPY package.json pnpm-lock.yaml ./
RUN corepack enable
RUN pnpm install --frozen-lockfile
COPY src/ src/
RUN pnpm run build ${FEATURE}

FROM public.ecr.aws/lambda/nodejs:22 AS runner
ARG FEATURE
RUN test -n "${FEATURE}" || (echo "FEATURE must be set" && exit 1)
COPY --from=builder /app/dist/${FEATURE}.js ${LAMBDA_TASK_ROOT}/feature.js
CMD ["feature.lambdaHandler"]
