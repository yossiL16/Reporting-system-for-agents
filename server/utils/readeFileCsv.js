import {readFile} from 'fs/promises';
import {parse} from 'csv-parse/sync';


export default async function loadData(path) {
    try {

        const data = await readFile(path, 'utf-8');
        const jsonData = parse(data, {
            columns:true,
            skip_empty_lines: true,
            trim: true
        });
        return jsonData
    } catch (err) {
        console.error({'error': err.message});
    }
}

