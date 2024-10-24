import { Identity } from './../../node_modules/@aws-sdk/client-cognito-identity/node_modules/@smithy/types/dist-types/identity/identity.d';
import { Injectable } from '@angular/core';
import { AuthService } from '../AuthService';
import { DynamoDBClient, GetItemCommand, ListTablesCommand, PutItemCommand  } from "@aws-sdk/client-dynamodb";
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

  async teste(){
    await this.initializeDynamoDBClient();
    try {
      const command = new ListTablesCommand({});
      const data = await this.dynamoDB.send(command);
      console.log('Tabelas:', data.TableNames); // Deve exibir as tabelas existentes
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao conectar ao DynamoDB:', {
          message: error.message,
          name: error.name,
          stack: error.stack,
          // Se houver mais informações no erro, você pode adicioná-las aqui
        });
      } else {
        console.error('Erro desconhecido ao conectar ao DynamoDB:', error);
      }
    } 
  }

  // Método para criar um item no DynamoDB
  async createItem(item: CampoPainel): Promise<void> {

    await this.initializeDynamoDBClient();
    
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
}
