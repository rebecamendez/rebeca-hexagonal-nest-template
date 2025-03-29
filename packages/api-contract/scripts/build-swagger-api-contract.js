const fs = require('fs');
const path = require('path');
const { createGenerator } = require('ts-json-schema-generator');

const API_CONTRACT_PATH = path.resolve(__dirname, '..');
const OUTPUT_PATH = path.resolve(__dirname, '../dist');

function getGeneratorConfig() {
  return {
    path: path.resolve(API_CONTRACT_PATH, 'src/**/*.ts'),
    tsconfig: path.resolve(API_CONTRACT_PATH, 'tsconfig.json'),
    type: '*',
    expose: 'export',
    topRef: true,
    jsDoc: 'extended',
    skipTypeCheck: false,
    additionalProperties: false,
    discriminatorType: 'property-name'
  };
} 


function filterDefinitions(definitions) {
  return Object.entries(definitions).reduce((acc, [key, value]) => {
    if (!key.endsWith('Mock')) acc[key] = value;
    return acc;
  }, {});
}

async function generateSwaggerMetadata() {
  if (!fs.existsSync(OUTPUT_PATH)) fs.mkdirSync(OUTPUT_PATH, { recursive: true });

  try {
    const generator = createGenerator(getGeneratorConfig());
    const schemas = generator.createSchema('*');

    if (!schemas?.definitions) throw new Error('No schemas were generated');

    const filteredDefinitions = filterDefinitions(schemas.definitions);
    const openApiSpec = { schemas: filteredDefinitions }; 

    const outputFile = path.resolve(OUTPUT_PATH, 'openapi.json');
    fs.writeFileSync(outputFile, JSON.stringify(openApiSpec, null, 2));

    console.log(`✅ OpenAPI documentation generated successfully: ${outputFile}`);
  } catch (error) {
    console.error('❌ Error generating OpenAPI documentation:', error);
    process.exit(1);
  }
}

generateSwaggerMetadata();
