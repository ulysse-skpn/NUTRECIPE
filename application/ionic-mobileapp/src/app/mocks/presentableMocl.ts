export class PresentableControllerMock 
{
    public presentableRef = 
    {
        present: () => Promise.resolve(),
        dismiss: (data?: any) => {
            if (this.dismissCallbackFn) {
            this.dismissCallbackFn(data);
            }
            return Promise.resolve({});
        },
        onDidDismiss: (fn) => {
            this.dismissCallbackFn = fn;
        }
    };

    public dismissCallbackFn = null;

    public create(options?) 
    {
        return Object.assign(this.presentableRef, options);
    }
}