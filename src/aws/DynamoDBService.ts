import { Injectable } from '@angular/core';
import { AuthService } from '../AuthService';
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

@Injectable({
  providedIn: 'root'
})
export class DynamoDBService {
  private dynamoDB: DynamoDBClient;

  constructor(private auth : AuthService) {
    this.dynamoDB = new DynamoDBClient({
      region: 'us-east-2',
      credentials: fromCognitoIdentityPool({
          identityPoolId: 'us-east-2:5c5dfdf2-ba56-4f64-a2cb-ad969818ba84', // Substitua pelo seu ID do pool de identidade
      }),
  });
  console.log(this.dynamoDB.send.toString());
  }

  // async configureCredentials() {
  //   try {
  //     // Obter a identidade do usuário autenticado
  //     const session = await this.auth.getCurrentSession();
  //     const idToken = session?.idToken?.toString()!;

  //     // Configurar as credenciais
  //     const credentials = new AWS.CognitoIdentityCredentials({
  //       IdentityPoolId: 'us-east-2:5c5dfdf2-ba56-4f64-a2cb-ad969818ba84', // O ID do seu pool de identidade
  //       Logins: {
  //         [`cognito-idp.us-east-2.amazonaws.com/us-east-2_8KkHocSfT`]: idToken
  //       }
  //     });

  //     // Atribuir as credenciais ao config global
  //   AWS.config.credentials = credentials;

  //   // Chamar refresh para obter as credenciais
  //   await credentials.getPromise();

  //     console.log('Credenciais configuradas com sucesso');
  //   } catch (error) {
  //     console.error('Erro ao configurar credenciais:', error);
  //   }
  // }

  // async addItem(item: any) {
  //   // await this.configureCredentials(); // Garantir que as credenciais estão configuradas

  //   const params = {
  //     TableName: 'ABICCA',
  //     Item: AWS.DynamoDB.Converter.marshall(item)
  //   };

  //   try {
  //     await this.dynamoDB.putItem(params).promise();
  //     console.log('Item adicionado com sucesso');
  //   } catch (error) {
  //     console.error('Erro ao adicionar item:', error);
  //   }
  // }

  async getItem(key: any) {
    // Definir os parâmetros da consulta
    const params = {
        TableName: 'ABICCA',
        Key: marshall(key)
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
