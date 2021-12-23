import Ajv from 'ajv';
import * as schema from "./schema.json";

export function json_validate(data: string): boolean {
    const ajv = new Ajv();
    const validate_schema = ajv.compile(schema);

    return validate_schema(data)
}
