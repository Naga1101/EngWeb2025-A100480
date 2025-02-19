import json

def normalize_json(path, output_path):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    cursos = {curso["id"]: {**curso, "alunos": []} for curso in data["cursos"]}
    instrumentos = {instr["id"]: {**instr, "alunos": []} for instr in data["instrumentos"]}

    for aluno in data["alunos"]:
        aluno_id = aluno["id"]
        curso_id = aluno["curso"]
        instrumento_nome = aluno["instrumento"]

        if curso_id in cursos:
            cursos[curso_id]["alunos"].append(aluno_id)

        for instr in instrumentos.values():
            if instr["#text"] == instrumento_nome:
                instr["alunos"].append(aluno_id)
                break  

    data["cursos"] = list(cursos.values())
    data["instrumentos"] = list(instrumentos.values())

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def main():
    normalize_json("db.json", "db_normalized.json")

if __name__ == "__main__":
    main()