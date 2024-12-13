import mysql.connector


def criarConexao(endereco, usuario, senha, bancodedados):
    return mysql.connector.connect(
        host=endereco, user=usuario, password=senha, database=bancodedados)


def encerrarBancoDados(connection):
    connection.close()


def insertNoBancoDados(connection, sql, dados):
    cursor = connection.cursor()
    cursor.execute(sql, dados)
    connection.commit()
    id = cursor.lastrowid
    cursor.close()
    return id


def listarBancoDados(connection, sql, params=None): #params =None fica como um parametro opcional, se passar um valor ele vai ser usado, se n passar ele assumirá padrão de none
    
    cursor = connection.cursor()

    if params:
        cursor.execute(sql, params)
    else:
        cursor.execute(sql)

    # Pegue os nomes das colunas da tabela
    colunas = [desc[0] for desc in cursor.description]

    # Pegue os resultados e mapeie para um dicionário com as colunas
    results = [dict(zip(colunas, row)) for row in cursor.fetchall()]
    cursor.close()
    return results


def atualizarBancoDados(connection, sql, dados):
    cursor = connection.cursor()
    cursor.execute(sql, dados)
    connection.commit()
    linhasAfetadas = cursor.rowcount
    cursor.close()
    return linhasAfetadas


def excluirBancoDados(connection, sql, dados):
    cursor = connection.cursor()
    cursor.execute(sql, dados)
    connection.commit()
    linhasAfetadas = cursor.rowcount
    cursor.close()
    return linhasAfetadas
