import { expect } from "chai";
import { Message } from "discord.js";
import callPraise from "../utils/callPraise";
import { discord } from "../utils/discord/discordClient";
import fetchUserById from "../utils/discord/fetchUserByID";
import fetchWalletConnection from "../utils/fetchWalletConnection";
require("dotenv").config();

const PREFIX = "!";
// this is the best example of a message I could reproduce so that I can actually implement some testing
const exampleMessage: Message = {
  channelId: "927691376638955533",
  guildId: "927691376638955530",
  id: "933365660107558933",
  createdTimestamp: 1642602114465,
  type: "DEFAULT",
  system: false,
  content: "!praise <@!927661675736350791> for ABC",
  // @ts-ignore
  author: {
    id: "369184527286927371",
    bot: false,
    system: false,
    username: "Alex Lazar",
    discriminator: "5943",
    avatar: "619399b21d18e86dc5470403e518a915",
    banner: undefined,
    accentColor: undefined,
  },
  pinned: false,
  tts: false,
  nonce: "933365659264352256",
  embeds: [],
  components: [],
  editedTimestamp: null,
  webhookId: null,
  groupActivityApplication: null,
  applicationId: null,
  activity: null,
  reference: null,
  interaction: null,
};

// I separated this test because it's resource/time intensive compared to the other tests
describe("Testing the callPraise() function", () => {
  it("Expecting status code of the txn to be 1", async () => {
    const praiserWalletConnection = await fetchWalletConnection(
      "discord",
      "369184527286927371" // this would be my discord id
    );
    const praiseTargetWalletConnection = await fetchWalletConnection(
      "discord",
      "927661675736350791" // this would be Toucan Praise Bot's discord ID (I've made a walletConnection for it under Carmen's discord & another wallet of mine)
    );
    expect(praiserWalletConnection).to.not.be.undefined;
    expect(praiserWalletConnection).to.not.be.null;
    expect(praiseTargetWalletConnection).to.not.be.undefined;
    expect(praiseTargetWalletConnection).to.not.be.null;
    if (!praiserWalletConnection || !praiseTargetWalletConnection) {
      return;
    }

    const discordToken: string = process.env.DISCORD_TOKEN || "";
    discord.login(discordToken);
    const target = await fetchUserById("927661675736350791");
    discord.destroy();

    const res = await callPraise(
      praiserWalletConnection,
      praiseTargetWalletConnection
    );

    expect(res.status).to.eql(1);
  });
});
