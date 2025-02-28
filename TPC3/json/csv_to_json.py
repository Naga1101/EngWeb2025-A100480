import json
import csv

def csv_to_json(csv_path, json_path):
    with open(csv_path, encoding="utf-8") as file:
        reader = csv.DictReader(file, delimiter=";")
        alunos = list(reader)

    alunos.sort(key=lambda aluno: int(aluno['id'][1:])) 

    for aluno in alunos:
        if(aluno['github'].strip().startswith('https://github.com/')):
            aluno['github'] = aluno['github'].strip()
        else:
            urlRelevant_parts = aluno['github'].split()
            aluno['github'] = 'https://github.com/' + urlRelevant_parts[0]

        url_parts = aluno['github'].split('/')

        aluno['github'] = 'https://github.com/' + url_parts[3] + '/EngWeb2024'

    data = {'alunos': alunos}

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
            


def main():
    csv_to_json("alunos.csv", "db_alunos.json")

if __name__ == "__main__":
    main()