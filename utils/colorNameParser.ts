export function ColorName2ThemeColorId(colName: String) {
    switch(colName) {
      case 'White':
        return 6;
      case 'Black':
        return 7;
      case 'Soft Blue':
        return 1;
      case 'Gentle Green':
        return 2;
      case 'Warm Orange':
        return 3;
      case 'Cool Purple':
        return 4;
      case 'Earthy Brown':
        return 5;
      default:
        return 2;
    }
}

export function ColName2RectangleColor(colName: String){
    const id = ColorName2ThemeColorId(colName);
    switch(id) {
        case 6:
          return "FFFFFF";
        case 7:
            return "FFFFFF";
        case 1:
            return "FFFFE0";
        case 2:
            return "FFA07A";
        case 3:
            return "90EE90";
        case 4:
            return "90EE90";
        case 5:
            return "FFC0CB";
        default:
            return "FFA07A";
    }
}