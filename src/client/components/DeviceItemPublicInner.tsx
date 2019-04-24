import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Device, User } from '../models';
import { connectionActions } from '../actions';
import { history } from '../services';

interface DeviceItemPublicInnerProps
{
    device: Device,
    selected: boolean
}

// Not stateless -- should change on the click event
export class DeviceItemPublicInner extends React.Component<DeviceItemPublicInnerProps & DispatchProp<any>, void>
{

    public constructor(props: DeviceItemPublicInnerProps & DispatchProp<any>)
    {
        super(props);

        // Set up the initial state

        this.onConnect = this.onConnect.bind(this);
    }

    private onConnect(event: React.MouseEvent<HTMLElement>): void
    {
        // Connect to the searched device
        const { dispatch, device } = this.props;
        dispatch(connectionActions.connect(device));

        // Forward to the order page
        history.push('/home/order');
    }

    public render(): React.ReactNode
    {
        let { device, selected } = this.props;

        return (
            <div className="content" style={{ display: 'inline-block' }}>
                <h3> {device.name} </h3>
                <h5> {device.deviceCategory} </h5>
                {
                    selected && (
                        <div>
                            <div> Access Type: {device.accessType} </div>
                            <div> Connection Code: {device.code} </div>

                            <div style={{ display: 'inline-block' }}>
                                <button onClick={this.onConnect}> Connect </button>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

function mapStateToProps(state: any, ownProps: DeviceItemPublicInnerProps): DeviceItemPublicInnerProps
{
    // Map only this device's health to the state
    return {
        device: ownProps.device,
        selected: ownProps.selected
    }
}

// Connect store and set up redux form
export default connect<{}, {}, DeviceItemPublicInnerProps>(
    mapStateToProps
)(DeviceItemPublicInner as any);