import os


for root, _dirs, files in os.walk("../data/raw/val", topdown=True):
    for file in files:
        if file[file.find("-") + 1 : file.find("-") + 3] != "09":
            file_path = os.path.join(root, file)
            os.remove(file_path)
