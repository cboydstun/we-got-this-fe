let gapi = window.gapi;

export async function initGoogleClient() {
    await gapi.load('client', () => {
        console.log('loaded client');
        gapi.client.init({
            apiKey: 'AIzaSyCSuD-_FQ3ockPsbQRsbCRgg1-lmcNsA6I',
            clientId:
                '566987245774-abeg79tlatngaaupsmdthc8ikouva2qo.apps.googleusercontent.com',
            discoveryDocs: [
                'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
            ],
            scope: 'https://www.googleapis.com/auth/calendar',
        });
        gapi.client.load('calendar', 'v3', () =>
            console.log('loaded calendar')
        );
    });
}
