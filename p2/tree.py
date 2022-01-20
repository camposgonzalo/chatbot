import pandas
from sklearn import tree
import pydotplus
from sklearn.tree import DecisionTreeClassifier
import matplotlib.pyplot as plt
import matplotlib.image as pltimg

data = pandas.read_csv("./data.csv")

country = {
    "Mexico": 0,
    "Colombia": 1,
    "Argentina": 2
}

assist = {
    "Si": 1,
    "No": 0
}

data["Pais"] = data["Pais"].map(country)
data["Asistir"] = data["Asistir"].map(assist)

print(data)

caracteristicas=["Edad","Experiencia","Clasificacion","Pais"]
x = data[caracteristicas]
y = data["Asistir"]

dtree = DecisionTreeClassifier()
dtree = dtree.fit(x,y)
data = tree.export_graphviz(dtree,out_file = None, feature_names=caracteristicas)
graph = pydotplus.graph_from_dot_data(data)
graph.write_png("./tree.png")

image = pltimg.imread("./tree.png")
imgplot = plt.imshow(image)
plt.show()