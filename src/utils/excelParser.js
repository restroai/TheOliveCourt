import * as XLSX from 'xlsx';

export const parseExcelFile = async (file) => {
  try {
    const response = await fetch(file);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Organize data into categories
    const menuData = {
      appetizers: data.filter(item => item.category === 'appetizers'),
      mainCourses: data.filter(item => item.category === 'mainCourses'),
      breads: data.filter(item => item.category === 'breads'),
      desserts: data.filter(item => item.category === 'desserts'),
      drinks: data.filter(item => item.category === 'drinks')
    };

    // Convert string values to proper types
    Object.keys(menuData).forEach(category => {
    menuData[category] = menuData[category].map(item => ({
      ...item,
      // Use the relative image path from Excel, assuming it's accessible from public folder
      image: item.image ? process.env.PUBLIC_URL + '/assets/images/' + item.image : '',
      price: Number(item.price),
      spicy: item.spicy === 'true',
      vegetarian: item.vegetarian === 'true',
      popular: item.popular === 'true'
    }));
    });

    return menuData;
  } catch (error) {
    console.error('Error parsing Excel file:', error);
    return null;
  }
};