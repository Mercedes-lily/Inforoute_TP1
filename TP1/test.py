import requests
import os

# 1. L'URL de téléchargement identifiée
url_telechargement = "https://api-proxy.edh-cde.dfo-mpo.gc.ca/catalogue/records/8b2ab772-036e-49c6-b35d-e5c08ce3ef69/attachments/DVL_Position_Corrected_Logs.zip"
nom_fichier_local = "DVL_Position_Corrected_Logs.zip"

print(f"Tentative de téléchargement depuis : {url_telechargement}")

try:
    # 2. Exécution de la requête GET
    # L'option 'stream=True' est cruciale pour les gros fichiers afin de ne pas saturer la mémoire (RAM)
    with requests.get(url_telechargement, stream=True) as r:
        r.raise_for_status() # Lève une exception si le statut est 4xx ou 5xx (comme 504)

        # 3. Enregistrement du contenu par blocs
        with open(nom_fichier_local, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)

    print(f"✅ Téléchargement réussi : {nom_fichier_local} a été enregistré.")

except requests.exceptions.RequestException as e:
    # Gère les erreurs de timeout ou autres erreurs de connexion (comme le 504)
    print(f"❌ Échec du téléchargement. Erreur : {e}")
    print("Conseil : L'erreur 504 est souvent temporaire. Réessayez plus tard.")