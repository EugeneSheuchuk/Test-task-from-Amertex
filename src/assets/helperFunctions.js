export const checkData = (state) => {
    const error = {};
    if (!state.IP['Ethernet_IP'].automaticallyIP) {
        error['Ethernet_IP'] = {...checkIP({...state.IP['Ethernet_IP']})};
    }
    if (!state.DNS['Ethernet_DNS'].AutoDNS) {
        error['Ethernet_DNS'] = {...checkDNS({...state.DNS['Ethernet_DNS']})};
    }
    if (state.NET.enableWifi) {
        if (state.NET.networkName.trim() === '' ||
            state.NET.networkName.trim() === 'Please select') {
            error.NET = {isError: true, errorNetworkName: 'No network selected'};
        }
        if (state.NET.enableWifiSecurity) {
            if (state.NET.securityKey.trim() === '') {
                error.NET = {isError: true, errorSecurityKey: 'The security key cannot be empty or contain only space(s)'};
            }
        }
        if (!state.IP['Wireless_IP'].automaticallyIP) {
            error['Wireless_IP'] = {...checkIP({...state.IP['Wireless_IP']})};
        }
        if (!state.DNS['Wireless_DNS'].AutoDNS) {
            error['Wireless_DNS'] = {...checkDNS({...state.DNS['Wireless_DNS']})};
        }
    }
    return error;
};

export const prepareData = (state) => {
    let result = {ethernet: {}, wireless: {}};
    if (!state.IP['Ethernet_IP'].automaticallyIP) {
        result.ethernet = {...state.IP['Ethernet_IP']};
    } else {
        result.ethernet = {automaticallyIP: state.IP['Ethernet_IP'].automaticallyIP};
    }
    if (!state.DNS['Ethernet_DNS'].AutoDNS) {
        result.ethernet = {...result.ethernet, ...state.DNS['Ethernet_DNS']};
    } else {
        result.ethernet = {...result.ethernet, AutoDNS: state.DNS['Ethernet_DNS'].AutoDNS};
    }
    if (!state.NET.enableWifi) {
        result.wireless = {enableWifi: false};
    } else {
        result.wireless = {enableWifi: true, networkName: state.NET.networkName};
        if (!state.IP['Wireless_IP'].automaticallyIP) {
            result.wireless = {...result.wireless, ...state.IP['Wireless_IP']};
        } else {
            result.wireless = {...result.wireless, automaticallyIP: true};
        }
        if (!state.DNS['Wireless_DNS'].AutoDNS) {
            result.wireless = {...result.wireless, ...state.DNS['Wireless_DNS']};
        } else {
            result.wireless = {...result.wireless, AutoDNS: true};
        }
        if (!state.NET.enableWifiSecurity) {
            result.wireless = {...result.wireless, enableWifiSecurity: state.NET.enableWifiSecurity};
        } else {
            result.wireless = {
                ...result.wireless, enableWifiSecurity: state.NET.enableWifiSecurity,
                securityKey: state.NET.securityKey
            };
        }
    }
    return result;
};

function checkIP(obj) {
    const errorObj = {
        isError: false,
        errorIPaddress: '',
        errorSubnetMask: '',
        errorGateway: '',
    };
    if (obj.IPaddress.trim() === '') {
        errorObj.isError = true;
        errorObj.errorIPaddress = 'the field cannot be empty';
    } else if (obj.IPaddress.trim().search(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/) !== 0) {
        errorObj.isError = true;
        errorObj.errorIPaddress = 'not valid field data';
    }
    if (obj.subnetMask.trim() === '') {
        errorObj.isError = true;
        errorObj.errorSubnetMask = 'the field cannot be empty';
    } else if (obj.subnetMask.trim().search(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/) !== 0) {
        errorObj.isError = true;
        errorObj.errorSubnetMask = 'not valid field data';
    }
    if (obj.gateway.trim() === '') {
        return errorObj;
    } else if (obj.gateway.trim().search(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/) !== 0) {
        errorObj.isError = true;
        errorObj.errorGateway = 'not valid field data';
    }
    return errorObj;
}

function checkDNS(obj) {
    const errorObj = {
        isError: false,
        errorpDNS: '',
        erroraDNS: '',
    };
    if (obj.pDNS.trim() === '') {
        errorObj.isError = true;
        errorObj.errorpDNS = 'the field cannot be empty';
    } else if (obj.pDNS.trim().search(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/) !== 0) {
        errorObj.isError = true;
        errorObj.errorpDNS = 'not valid field data';
    }
    if (obj.aDNS.trim() === '') {
        return errorObj;
    } else if (obj.aDNS.trim().search(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/) !== 0) {
        errorObj.isError = true;
        errorObj.erroraDNS = 'not valid field data';
    }
    return errorObj;
}

const keys = ['Ethernet_IP', 'Ethernet_DNS', 'Wireless_IP', 'Wireless_DNS', 'NET'];
export const CLEAR_ERROR_TEXT = 'omertex-react/helperFunctions/CLEAR_ERROR_TEXT';
export const CLEAR_REDUCER_TEXT = 'omertex-react/helperFunctions/CLEAR_REDUCER_TEXT';

export function clearErrorMessages(dispatch) {
    keys.forEach(item => dispatch({type: CLEAR_ERROR_TEXT, key: item}));
}

export function clearReducersData(dispatch) {
    keys.forEach(item => dispatch({type: CLEAR_REDUCER_TEXT, key: item}));
}