import json

def rename_keys(obj):
    if isinstance(obj, dict):
        return {('text' if key == '#text' else key): rename_keys(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [rename_keys(item) for item in obj]
    return obj

def normalize_json(path, output_path):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    data = rename_keys(data)

    cursos = {curso["id"]: {**curso, "alunos": []} for curso in data["cursos"]}
    instrumentos = {instr["id"]: {**instr, "alunos": [], "cursos": []} for instr in data["instrumentos"]}

    cs_counter = 1

    for curso in cursos.values():
        if curso["id"].startswith("CS"):
            curso["id"] = f"CS{cs_counter}"
            cs_counter += 1

    for aluno in data["alunos"]:
        aluno_id = aluno["id"]
        curso_id = aluno["curso"]
        instrumento_nome = aluno["instrumento"]

        if curso_id in cursos:
            cursos[curso_id]["alunos"].append(aluno_id)

        for instr in instrumentos.values():
            if instr["text"] == instrumento_nome:
                instr["alunos"].append(aluno_id)
                if curso_id not in instr["cursos"]:
                    instr["cursos"].append(curso_id)

                aluno["instrumento"] = {
                    "id": instr["id"],
                    "text": instrumento_nome
                }
                break  

    data["cursos"] = list(cursos.values())
    data["instrumentos"] = list(instrumentos.values())

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def main():
    normalize_json("db.json", "db_normalized.json")

if __name__ == "__main__":
    main()
