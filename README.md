# APEX RECOMP

PWA para registrar marcas, seguir sesiones de fuerza y organizar comidas. Abre https://agusgonbel-code.github.io/apex-recomp-app/ en Safari y usa Compartir → Añadir a pantalla de inicio.

## Cómo empezar

1. En **Programa**, elige entre dos y cinco días por semana, objetivo, experiencia y material. La app prepara ocho semanas de sesiones de cuerpo completo o tren superior/inferior, con series, repeticiones, RIR y descansos. Se proponen cargas a partir de las marcas previas; la elección final de peso es del usuario. Las semanas 4 y 8 reducen volumen. Puedes cambiar un ejercicio o su orden durante la sesión.
2. En **Alimentación**, indica dieta, alérgenos, peso y energía diaria si los conoces. Se crea un menú de siete días. Pulsa «Cambiar receta» para elegir otra del mismo grupo de comida y ver los totales actualizados. Hay **1.008 combinaciones únicas** (252 por desayuno, comida, cena y merienda), generadas a partir de cuatro componentes y cantidades explícitas. Son variantes de platos, no 1.008 recetas elaboradas a mano.
3. **Más** reúne historial, progreso, diario nutricional, recetas y copias JSON. Los datos se guardan en el navegador actual. Exporta la copia antes de borrar Safari o cambiar de dispositivo. Una instalación en otro origen o navegador no recupera los datos automáticamente.

Los nutrientes son **estimaciones**, calculadas a partir de valores orientativos por 100 g de ingrediente. La preparación y la marca de productos alteran los resultados. Confirma siempre las etiquetas si tienes alergias. No se han evaluado afecciones, medicación, embarazo ni necesidades clínicas; estos planes generales para adultos sanos no sustituyen una valoración profesional individual.

Referencias de diseño: [posición ACSM 2026 sobre entrenamiento de fuerza](https://pubmed.ncbi.nlm.nih.gov/41843416/), [ISSN sobre proteína y ejercicio](https://pmc.ncbi.nlm.nih.gov/articles/PMC5477153/), [USDA FoodData Central sobre valores y porciones](https://fdc.nal.usda.gov/Foundation_Foods_Documentation/) y [MyPlate para variedad de grupos alimentarios](https://www.myplate.gov/web/web/eat-healthy/vegetables). Las combinaciones y cantidades concretas de la app son decisiones de producto, no protocolos validados por esas fuentes.

## Publicación y pruebas

GitHub Pages debe estar activado con origen **GitHub Actions**. `.github/workflows/pages.yml` ejecuta `node test-integration.cjs`, construye una distribución pública sin datos personales, prueba los recorridos en Chromium y publica solo tras pasar las pruebas. `node scripts/browser-smoke.cjs` requiere Playwright 1.56.1 y Chromium instalado.
