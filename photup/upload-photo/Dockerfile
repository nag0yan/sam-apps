FROM public.ecr.aws/lambda/nodejs:22 AS builder

WORKDIR /app/
COPY src/ src/
COPY scripts/ scripts/
COPY package.json pnpm-lock.yaml ./
RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM public.ecr.aws/lambda/nodejs:22 AS runner
COPY --from=builder /app/dist/app.js ${LAMBDA_TASK_ROOT}
CMD ["app.lambdaHandler"]
