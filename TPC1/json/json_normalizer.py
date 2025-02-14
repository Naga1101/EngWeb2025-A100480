import json

def normalize_json(path, output_path):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    viaturas = {}  
    intervencoes = {}  
    reparacoes = []  
    
    for reparacao in data['reparacoes']:
        viatura = reparacao['viatura']
        viatura_id = viatura['matricula']
        
        if viatura_id not in viaturas:
            viaturas[viatura_id] = {
                "marca": viatura['marca'],
                "modelo": viatura['modelo'],
                "matricula": viatura['matricula']
            }
        
        intervencao_refs = []

        for intervencao in reparacao['intervencoes']:
            intervencao_id = intervencao['codigo'] 
            
            if intervencao_id not in intervencoes:
                intervencoes[intervencao_id] = {
                    "codigo": intervencao['codigo'],
                    "nome": intervencao['nome'],
                    "descricao": intervencao['descricao']
                }
            
            intervencao_refs.append(intervencao_id)
        
        reparacoes.append({
            "nome": reparacao["nome"],
            "nif": reparacao["nif"],
            "data": reparacao["data"],
            "viatura": viatura_id,  
            "nr_intervencoes": reparacao["nr_intervencoes"],
            "intervencoes": intervencao_refs 
        })

    viaturas_sorted = sorted(viaturas.values(), key=lambda v: v['marca'])
    intervencoes_sorted = sorted(intervencoes.values(), key=lambda i: i['codigo'])
    
    normalized_data = {
        "viaturas": viaturas_sorted,
        "intervencoes": intervencoes_sorted,
        "reparacoes": reparacoes
    }

    with open(output_path, "w", encoding="utf-8") as output_file:
        json.dump(normalized_data, output_file, ensure_ascii=False, indent=4)



def main():
    normalize_json("dataset_reparacoes.json", "normalized_dataset.json")

if __name__ == "__main__":
    main()