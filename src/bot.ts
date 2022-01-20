// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  ActivityHandler,
  ConsoleTranscriptLogger,
  MessageFactory,
  TurnContext,
} from "botbuilder";

export class EchoBot extends ActivityHandler {
  public conversationReferences: any = {};

  constructor() {
    super();
    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    this.onMessage(async (context, next) => {
      const replyText = `Echo: ${context.activity.text}`;
      await context.sendActivity(MessageFactory.text(replyText, replyText));
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      this.addConversationReference(context.activity);
      const welcomeText = "Hello and welcome!";
      for (const member of membersAdded) {
        if (member.id !== context.activity.recipient.id) {
          await context.sendActivity(
            MessageFactory.text(welcomeText, welcomeText)
          );
        }
      }
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onConversationUpdate(async (context, next) => {
      this.addConversationReference(context.activity);

      await next();
    });
  }

  addConversationReference(activity) {
    const conversationReference =
      TurnContext.getConversationReference(activity);
    this.conversationReferences[conversationReference.conversation.id] =
      conversationReference;
  }
}
