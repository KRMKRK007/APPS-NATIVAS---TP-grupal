# VaConVos - Guía de Estilo y Recursos Adicionales

## 🎨 Paleta de Colores Implementada

### Colores Principales
- **Verde Primario**: `#4a7c59` - Color principal de la marca
- **Verde Secundario**: `#6eb57a` - Tonos más claros y frescos
- **Verde Terciario**: `#2d5016` - Tonos más oscuros y sobrios

### Colores de Acento
- **Verde Menta**: `#a8d5ba` - Para acentos suaves
- **Verde Oliva**: `#556b2f` - Para textos importantes
- **Beige Natural**: `#f5f5dc` - Para fondos suaves

### Gradientes Naturales
- **Primario**: `linear-gradient(135deg, #4a7c59 0%, #6eb57a 100%)`
- **Secundario**: `linear-gradient(135deg, #6eb57a 0%, #a8d5ba 100%)`
- **Sutil**: `linear-gradient(135deg, #f8fdf9 0%, #f5f5dc 100%)`

## 🔤 Tipografía

### Fuentes Principales
- **Primaria**: `Roboto` - Para texto general
- **Secundaria**: `Inter` - Para elementos de interfaz
- **Acento**: `Poppins` - Para títulos y elementos destacados

### Escalas de Texto
- XS: 12px | SM: 14px | Base: 16px | LG: 18px | XL: 20px | 2XL: 24px | 3XL: 30px

## 🎭 Animaciones y Efectos

### Animaciones Disponibles
```css
.va-animate-fade-in-up    /* Aparición desde abajo */
.va-animate-scale-in      /* Escalado suave */
```

### Transiciones
- **Rápida**: `0.15s ease-out`
- **Normal**: `0.25s ease-out`
- **Lenta**: `0.4s ease-out`

## 📱 Componentes Estilizados

### Botones
- Bordes redondeados suaves
- Sombras sutiles
- Efectos hover con elevación
- Gradientes para botones primarios

### Cards
- Bordes redondeados grandes (20px)
- Sombras profesionales
- Efectos hover con elevación
- Bordes sutiles con el color primario

### Inputs y Formularios
- Fondos naturales
- Bordes focalizados en verde
- Iconos descriptivos
- Labels flotantes estilizadas

## 🌟 Características Implementadas

### Responsive Design
- Diseño adaptativo para móviles, tablets y desktop
- Grid flexible para productos
- Navegación optimizada para touch

### Accesibilidad
- Contraste adecuado de colores
- Respeto por `prefers-reduced-motion`
- Elementos focalizables claramente definidos
- Textos legibles y escalables

### Modo Oscuro
- Paleta adaptada para modo oscuro
- Conservación de la identidad verde
- Transiciones suaves entre modos

## 🚀 Recursos Adicionales Sugeridos

### Iconografía Recomendada
Para mantener la coherencia con el tema natural, considera estos iconos:
- `leaf`, `leaf-outline` - Para elementos eco
- `basket`, `basket-outline` - Para carrito y compras
- `storefront`, `storefront-outline` - Para tiendas
- `location`, `location-outline` - Para direcciones
- `heart`, `heart-outline` - Para favoritos

### Imágenes de Fondo Sugeridas
Si deseas agregar patrones o texturas:
- Patrones orgánicos sutiles
- Texturas de papel reciclado
- Elementos botanicos minimalistas
- Watermarks muy sutiles con hojas

### Mejoras Futuras
1. **Micro-animaciones**: Añadir más animaciones para interacciones
2. **Skeleton Loading**: Implementar placeholders durante cargas
3. **Gestos**: Añadir swipe gestures para mejor UX móvil
4. **Theming dinámico**: Permitir al usuario personalizar colores
5. **Modo de alto contraste**: Para mejor accesibilidad

## 🎯 Uso de Variables CSS

Todas las variables están centralizadas en `variables.scss`:
```css
/* Espaciado */
--va-spacing-xs: 0.25rem;   /* 4px */
--va-spacing-sm: 0.5rem;    /* 8px */
--va-spacing-md: 1rem;      /* 16px */

/* Bordes */
--va-border-radius-sm: 6px;
--va-border-radius-md: 12px;
--va-border-radius-lg: 20px;

/* Sombras */
--va-shadow-sm: (definición de sombra sutil)
--va-shadow-md: (definición de sombra media)
--va-shadow-lg: (definición de sombra pronunciada)
```

## 📐 Clases Utilitarias

### Espaciado
- `.va-m-xs`, `.va-m-sm`, `.va-m-md`, `.va-m-lg`, `.va-m-xl` - Márgenes
- `.va-p-xs`, `.va-p-sm`, `.va-p-md`, `.va-p-lg`, `.va-p-xl` - Padding

### Efectos Visuales
- `.va-shadow-soft`, `.va-shadow-medium`, `.va-shadow-strong` - Sombras
- `.va-rounded-sm`, `.va-rounded-md`, `.va-rounded-lg` - Bordes redondeados
- `.va-gradient-bg`, `.va-gradient-text` - Gradientes

### Colores de Texto
- `.va-text-primary`, `.va-text-secondary`, `.va-text-muted` - Colores de texto
- `.va-bg-natural`, `.va-bg-mint`, `.va-bg-white` - Fondos

---

## 💡 Consejos de Implementación

1. **Consistencia**: Usa siempre las variables CSS definidas
2. **Responsive**: Siempre testa en diferentes tamaños de pantalla
3. **Performance**: Las animaciones están optimizadas, no agregues más sin necesidad
4. **Mantenibilidad**: Cada componente tiene su propio archivo SCSS para mejor organización

¡Disfruta tu nueva interfaz natural y profesional! 🌱