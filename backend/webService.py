from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
from operacoesbd import *

load_dotenv()

user = os.getenv('SECRET_USER')
password = os.getenv('SECRET_PASSWORD')
address = os.getenv('SECRET_ADDRESS')
table = os.getenv('SECRET_TABLE')

print(user,password)

app = Flask(__name__)



conn = criarConexao(address,user,password,table)


# 1) Listagem das Tasks
@app.route('/tasks', methods=['GET'])
def getAllTasks():
    data = listarBancoDados(conn, 'SELECT * FROM TASKS')
    if data:
        return jsonify(data)
    else:
        return '', 404


# 2) Criar uma nova Task
@app.route('/tasks', methods=['POST'])
def createTask():
    data = request.json
    if 'title' in data and 'description' in data:
    
        newTask = {}
        newTask['title'] = data['title']
        newTask['description'] = data['description']
        newTask['status'] = data['status']
        newTask['priority'] = data['priority']

        insert = "INSERT INTO tasks (TITLE,DESCRIPTION,STATUS,PRIORITY)VALUES(%s,%s,%s,%s)"
        dados = [newTask['title'],newTask['description'],newTask['status'], newTask['priority']]
        newTask['id'] = insertNoBancoDados(conn, insert, dados)
        return jsonify(newTask), 201
    else:
        return '', 400
    
    
# 6) Atualizar uma Task
@app.route('/tasks/<int:idTask>' , methods=['PUT'])
def updateTask(idTask):
    
        data = request.json
        valores = {}
        valores['title'] = data.get('title')
        valores['description'] = data.get('description')
        valores['status'] = data.get('status')
        valores['priority'] = data.get('priority')
        
        update = "UPDATE tasks SET TITLE = %s, DESCRIPTION = %s, STATUS = %s, PRIORITY = %s WHERE ID = %s"
        
        dados = [valores['title'],valores['description'],valores['status'], valores['priority'], idTask]
        atualizarBancoDados(conn,update, dados)
        if valores:
            return jsonify(valores)
        else:
            return '', 404
    
        



# 6) Excluir uma Task
@app.route('/tasks/<int:idTask>', methods=['DELETE'])
def deleteTask(idTask):
    data = f"DELETE FROM tasks WHERE ID = %s"
    dados = [idTask]
    src = excluirBancoDados(conn, data, dados)
    if src:
        return '', 204
    else:
        return '', 404


if __name__ == '__main__':
    app.run(debug=True)