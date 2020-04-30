const csURL = 'https://api-sandbox.cloudsign.jp';

async function GetDocuments() {
  try {
    const response = await fetch(`${csURL}/documents/${this.id}`, {
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${this.access_token}`,
        Accept: 'application/json',
      },
    });
    const data = await response.json();

    if (!response.ok || response.status != 200) {
      return null;
    }

    return data;
  } catch (e) {
    console.log(e);
  }
}
