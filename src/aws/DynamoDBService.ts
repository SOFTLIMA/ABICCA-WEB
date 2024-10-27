import { Identity } from './../../node_modules/@aws-sdk/client-cognito-identity/node_modules/@smithy/types/dist-types/identity/identity.d';
import { Injectable } from '@angular/core';
import { AuthService } from '../AuthService';
import { DeleteItemCommand, DynamoDBClient, GetItemCommand, ListTablesCommand, PutItemCommand, ScanCommand, ScanCommandInput, UpdateItemCommand  } from "@aws-sdk/client-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { CampoPainel } from '../Model/PainelADM';

@Injectable({
  providedIn: 'root'
})
export class DynamoDBService {
  private dynamoDB: DynamoDBClient = new DynamoDBClient;


  constructor(private auth : AuthService) {
    this.initializeDynamoDBClient();
  }

  async initializeDynamoDBClient() {
    const tokens = await this.auth.getCurrentSession();

    const idToken = tokens?.idToken?.toString();

    let COGNITO_ID = "cognito-idp.us-east-2.amazonaws.com/us-east-2_8KkHocSfT"; // 'COGNITO_ID' has the format 'cognito-idp.REGION.amazonaws.com/COGNITO_USER_POOL_ID'
    let loginData = {
      [COGNITO_ID]: idToken!
    };


    if (tokens?.idToken) {
      this.dynamoDB = new DynamoDBClient({
        region: 'us-east-2',
        credentials: fromCognitoIdentityPool({
          clientConfig: {region: 'us-east-2'},
          identityPoolId: 'us-east-2:92bb552d-95a1-4b56-8160-4ed4864bb054', // Substitua pelo seu ID do pool de identidade
          logins: loginData
        })
      });

    } else {
      console.error('Tokens de autenticação não disponíveis.');
    }
  }

  async getAllItens(){
    await this.initializeDynamoDBClient();

    const params = {
      TableName: 'ABICCA'
    };

    try {
      const items = [];
      let data;
      const command = new ScanCommand(params);
      data = await this.dynamoDB.send(command);

      // Adiciona os itens retornados na lista de itens
      if (data.Items) {
          items.push(...data.Items.map(item => unmarshall(item)));
      }

      return items;

  } catch (error) {
      console.error('Erro ao buscar todos os itens:', error);
      throw error; // Repassa o erro para ser tratado externamente, se necessário
  }
  }

  // Método para criar um item no DynamoDB
  async createItem(item: CampoPainel): Promise<void> {

    await this.initializeDynamoDBClient();

    let temp = await this.getAllItens();

    temp.forEach(element => {

      if (item.ABICCA_id == element['ABICCA_id']) {
        console.log('Item já existe.');
        return;
      }

    });

    const params = {
      TableName: 'ABICCA',
      Item: marshall(item), // Converte o item para o formato esperado pelo DynamoDB
    };

    try {
      const command = new PutItemCommand(params);
      await this.dynamoDB.send(command);
      console.log('Item criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar item:', error);
    }
  }

  async getItem(key: any) {

    await this.initializeDynamoDBClient();

    // Definir os parâmetros da consulta
    const params = {
        TableName: 'ABICCA',
        Key: marshall({ABICCA_id: key})
    };

    try {
        // Criar e enviar o comando
        const command = new GetItemCommand(params);
        const data = await this.dynamoDB.send(command);

        // Retornar o item deserializado ou null
        return data.Item ? unmarshall(data.Item) : null;
    } catch (error) {
        console.error('Erro ao obter item:', error);
        return null; // Retorna null em caso de erro
    }
  }

  async updateItem(item: CampoPainel): Promise<any> {
    try {
      const command = new UpdateItemCommand({
        TableName: 'ABICCA', // Substitua pelo nome da sua tabela
        Key: marshall({
          ABICCA_id: item.ABICCA_id // A chave primária do item a ser atualizado
        }),
        UpdateExpression: 'set titulo = :titulo, #d = :data, descricao = :descricao, link_Imgs = :link_Imgs',
        ExpressionAttributeNames: {
          '#d': 'data' // Placeholder para a palavra-chave reservada
        },
        ExpressionAttributeValues: marshall({
          ':titulo': item.titulo,
          ':data': item.data,
          ':descricao': item.descricao,
          ':link_Imgs': item.link_Imgs // Se link_Imgs for um array, ajuste conforme necessário
        }),
        ReturnValues: 'UPDATED_NEW' // Para retornar os novos valores atualizados
      });

      return this.dynamoDB.send(command);
      } catch (error) {
          console.error('Erro ao obter item:', error);
      }
  }

  async deleteItem(item: CampoPainel): Promise<any> {
    try {
      const command = new DeleteItemCommand({
        TableName: 'ABICCA', // Substitua pelo nome da sua tabela
        Key: marshall({
          ABICCA_id: item.ABICCA_id // A chave primária do item a ser deletado
        }),
        // ReturnValues: 'ALL_OLD' // Para retornar os valores antigos antes da deleção, se necessário
      });

      const result = await this.dynamoDB.send(command);
      console.log('Item deletado com sucesso:', result);
      return result; // Retorna o resultado da operação de deleção
    } catch (error) {
      console.error('Erro ao deletar item:', error);
      throw error; // Rejoga o erro para tratamento posterior, se necessário
    }
  }
}
