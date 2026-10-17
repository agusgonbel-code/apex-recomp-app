# APEX RECOMP

PWA para registrar marcas, seguir sesiones de fuerza y organizar comidas. Abre https://agusgonbel-code.github.io/apex-recomp-app/ en Safari y usa Compartir → Añadir a pantalla de inicio.

## Experiencia 2.0

La pantalla **Hoy** muestra la siguiente acción, tres sesiones próximas y las comidas del día. Durante un entrenamiento guiado se trabaja un ejercicio a la vez: la barra superior permite saltar a cualquiera de ellos, ver series completadas y retomar el punto guardado. **Plan** conserva la vista de las ocho semanas y muestra cuántas sesiones se han completado en cada una. **Comidas** usa fechas legibles y un resumen de energía y macronutrientes. El rediseño usa la misma clave de almacenamiento y el mismo origen web para conservar datos anteriores; no borres el sitio ni sus datos de Safari al actualizar.

## Cómo empezar

1. En **Programa**, elige entre dos y cinco días por semana, objetivo, experiencia y material. La app prepara ocho semanas de sesiones de cuerpo completo o tren superior/inferior, con series, repeticiones, RIR y descansos. Se proponen cargas a partir de las marcas previas; la elección final de peso es del usuario. Las semanas 4 y 8 pueden reducir volumen por elección del usuario. Se pueden ver las ocho semanas y mover las fechas orientativas sin reiniciar las marcas. Puedes cambiar un ejercicio o su orden durante la sesión.
2. En **Alimentación**, indica dieta, alérgenos, peso y energía diaria si los conoces. Se crea un menú de siete días que reutiliza ingredientes para simplificar la compra. Pulsa «Cambiar receta» para elegir otra del mismo grupo de comida y ver los totales actualizados. Hay **1.008 combinaciones únicas** (252 por desayuno, comida, cena y merienda), generadas a partir de cuatro componentes y cantidades explícitas. Son variantes de platos, no 1.008 recetas elaboradas a mano.
3. Durante la sesión puedes marcar series y usar el temporizador de descanso. **Alimentación** agrega una lista de compra de siete días que sigue los cambios de receta; puedes tachar ingredientes y descargarla. En **Recetas** puedes guardar favoritas. **Nutrición** permite registrar comidas en otra fecha y **Progreso** guarda el peso corporal sin ajustar automáticamente tus objetivos.
4. **Más** reúne historial, progreso, diario nutricional, recetas y copias JSON. Los datos se guardan en el navegador actual. Exporta la copia antes de borrar Safari o cambiar de dispositivo. Una instalación en otro origen o navegador no recupera los datos automáticamente.

Los nutrientes son **estimaciones**, calculadas a partir de valores orientativos por 100 g de ingrediente. La preparación y la marca de productos alteran los resultados. Confirma siempre las etiquetas si tienes alergias. No se han evaluado afecciones, medicación, embarazo ni necesidades clínicas; estos planes generales para adultos sanos no sustituyen una valoración profesional individual.

Referencias de diseño: [posición ACSM 2026 sobre entrenamiento de fuerza](https://pubmed.ncbi.nlm.nih.gov/41843416/), [ISSN sobre proteína y ejercicio](https://pmc.ncbi.nlm.nih.gov/articles/PMC5477153/), [USDA FoodData Central sobre valores y porciones](https://fdc.nal.usda.gov/Foundation_Foods_Documentation/) y [MyPlate para variedad de grupos alimentarios](https://www.myplate.gov/web/web/eat-healthy/vegetables). Las combinaciones y cantidades concretas de la app son decisiones de producto, no protocolos validados por esas fuentes.

## Publicación y pruebas

GitHub Pages debe estar activado con origen **GitHub Actions**. `.github/workflows/pages.yml` ejecuta `node test-integration.cjs`, construye una distribución pública sin datos personales, prueba los recorridos en Chromium y publica solo tras pasar las pruebas. `node scripts/browser-smoke.cjs` requiere Playwright 1.56.1 y Chromium instalado.

Inspiración funcional a partir de valoraciones de [Hevy](https://apps.apple.com/es/app/hevy-gym-tracker-y-rutinas/id1458862350), [Strong](https://apps.apple.com/es/app/strong-workout-tracker-gym-log/id464254577), [MacroFactor](https://apps.apple.com/es/app/macrofactor-macro-tracker/id1553503471), [Cronometer](https://apps.apple.com/es/app/contar-calorias-cronometer/id1145935738) y [Mealime](https://apps.apple.com/es/app/mealime-meal-plans-recipes/id1079999103). Implementación original; no incluye sus bases de datos, algoritmos, sincronización, vídeos ni servicios comerciales.

## Acceso rápido

La pantalla **Hoy** permite iniciar o continuar la siguiente sesión guiada y registrar los platos del día. **Entrenar** mantiene el inicio libre bajo un desplegable y muestra marcas anteriores durante la sesión. En las sesiones guiadas, «Cambiar ejercicio» propone alternativas según el material elegido; cada ejercicio conserva su identidad en el historial. **Nutrición** permite repetir alimentos usados antes, registrar otro día y comparar energía o proteína con objetivos que el usuario haya fijado. Las cifras no se ajustan automáticamente.

## Alcance de la evidencia

La posición de ACSM 2026 sintetiza 137 revisiones: para adultos sanos, el entrenamiento de fuerza progresivo de los grandes grupos musculares al menos dos veces por semana mejora fuerza y masa muscular. Más volumen semanal puede favorecer la hipertrofia; cargas altas favorecen la fuerza. El calendario exacto de ocho semanas, los ejercicios elegidos, el RIR, los descansos y las semanas de menor volumen de esta app son decisiones de implementación y no un programa evaluado individualmente ni un protocolo validado en un ensayo. El usuario elige la carga y puede modificar o detener ejercicios.
