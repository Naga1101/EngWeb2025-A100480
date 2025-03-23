import json


def add_ids_to_json(in_json, out_json):
    with open(in_json, 'r') as file:
        movies = json.load(file)

    for idx, movie in enumerate(movies, start=1):
        movie["id"] = idx

    output_data = {"filmes": movies}

    with open(out_json, 'w') as file:
        json.dump(output_data, file, indent=2)


def main():
    add_ids_to_json("cinema.json", "db_cinema.json")

if __name__ == "__main__":
    main()