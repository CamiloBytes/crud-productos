# 📸 Flujo de Manejo de Imágenes - API

## 🔄 Arquitectura del Sistema

```
Frontend (Next.js) ──→ API Routes ──→ Backend Laravel
    FormData            FormData         Validación + Storage
```

## 📝 Endpoints Actualizados

### 1️⃣ **POST /api/products** - Crear Producto con Imagen

#### Frontend → API Route
```typescript
const formData = new FormData()
formData.append('name', 'Laptop Gaming')
formData.append('sku', 'LAP-001')
formData.append('category', 'Electrónica')
formData.append('price', '1200.00')
formData.append('stock', '50')
formData.append('status', 'disponible')
formData.append('image', file) // File object
```

#### API Route → Backend Laravel
```typescript
// src/app/api/products/route.ts
export async function POST(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const formData = await request.formData()
    
    const backendFormData = new FormData()
    formData.forEach((value, key) => {
        backendFormData.append(key, value)
    })

    const response = await fetch(`${API_URL}/products/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            // NO incluir Content-Type (auto boundary)
        },
        body: backendFormData,
    })
}
```

### 2️⃣ **POST /api/products/[id]** - Actualizar Producto con Imagen

#### Frontend → API Route
```typescript
const formData = new FormData()
formData.append('name', 'Laptop Gaming Pro')
formData.append('sku', 'LAP-001')
formData.append('category', 'Electrónica')
formData.append('price', '1300.00')
formData.append('stock', '45')
formData.append('status', 'disponible')
formData.append('_method', 'PUT') // Laravel method spoofing
formData.append('image', file) // File object (opcional)
```

#### API Route → Backend Laravel
```typescript
// src/app/api/products/[id]/route.ts
export async function POST(request: NextRequest, { params }) {
    const { id } = await params
    const token = request.cookies.get('token')?.value
    const formData = await request.formData()
    
    const backendFormData = new FormData()
    formData.forEach((value, key) => {
        backendFormData.append(key, value)
    })

    // POST con _method=PUT para Laravel
    const response = await fetch(`${API_URL}/products/${id}/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: backendFormData,
    })
}
```

## ⚙️ Validación Backend Laravel

```php
$validator = Validator::make($request->all(), [
    'name' => 'required|string|max:255',
    'sku' => 'required|string|unique:products,sku,' . $id,
    'category' => 'nullable|string|max:255',
    'price' => 'required|numeric|min:0',
    'stock' => 'nullable|integer|min:0',
    'status' => 'nullable|string|max:255',
    'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB
]);
```

## 📦 Componentes Actualizados

### AddProductForm.tsx
- ✅ Campo de tipo `file` con accept de imágenes
- ✅ Vista previa de imagen antes de subir
- ✅ Envío mediante `FormData`
- ✅ Validación de formatos: JPEG, PNG, JPG, GIF, WEBP
- ✅ Tamaño máximo: 5MB

### EditProductForm.tsx
- ✅ Campo de tipo `file` con accept de imágenes
- ✅ Vista previa de imagen actual o nueva
- ✅ Envío mediante `FormData` con `_method=PUT`
- ✅ Imagen opcional (mantiene la anterior si no se cambia)

### ProductCards.tsx
- ✅ Muestra imagen del producto si existe
- ✅ Emoji placeholder (📦) si no hay imagen
- ✅ Soporte para campo `image`

## 🔑 Puntos Importantes

1. **Content-Type Automático**: No se establece manualmente el `Content-Type` cuando se envía `FormData`, el navegador lo hace automáticamente con el boundary correcto.

2. **Laravel Method Spoofing**: Para actualizar con FormData, Laravel requiere:
   ```typescript
   formData.append('_method', 'PUT')
   // Y usar POST en lugar de PUT
   ```

3. **Token de Autenticación**: Siempre se incluye en el header `Authorization: Bearer ${token}`

4. **Tipos TypeScript**: El tipo `Product` incluye el campo `image?: string` para la URL de la imagen

5. **FormData en Frontend**:
   ```typescript
   // Registro del input
   {...register('image')}
   
   // Manejo del cambio
   onChange={(e) => {
       register('image').onChange(e)
       handleImageChange(e)
   }}
   ```

## 🎯 Flujo Completo

1. Usuario selecciona imagen en el formulario
2. Vista previa se muestra usando `FileReader`
3. Al enviar, se crea `FormData` con todos los campos
4. FormData se envía a `/api/products` o `/api/products/[id]`
5. API Route reenvía el FormData al backend Laravel
6. Laravel valida y almacena la imagen
7. Backend responde con el producto creado/actualizado (incluye URL de imagen)
8. Frontend actualiza la UI con la nueva información

## 🚀 Uso

### Crear producto con imagen:
```bash
POST /api/products
Content-Type: multipart/form-data

{
  name: "Laptop",
  sku: "LAP-001",
  category: "Electrónica",
  price: 1200,
  stock: 50,
  status: "disponible",
  image: [archivo binario]
}
```

### Actualizar producto con imagen:
```bash
POST /api/products/1
Content-Type: multipart/form-data

{
  name: "Laptop Pro",
  sku: "LAP-001",
  category: "Electrónica",
  price: 1300,
  stock: 45,
  status: "disponible",
  _method: "PUT",
  image: [archivo binario]
}
```

## ✅ Checklist de Implementación

- [x] API Route POST /api/products acepta FormData
- [x] API Route POST /api/products/[id] acepta FormData
- [x] AddProductForm envía FormData con imagen
- [x] EditProductForm envía FormData con imagen
- [x] ProductCards muestra imagen del producto
- [x] Tipos TypeScript actualizados con campo image
- [x] Validación de formatos de imagen
- [x] Vista previa de imagen en formularios
- [x] Manejo de errores en carga de imágenes
