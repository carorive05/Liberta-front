import React from 'react';
import { Flex, Box, CheckboxGroup, Heading, Text, Button } from '@radix-ui/themes';


export interface FilterState {
  accesibilidades: string[]; // Guardará valores como: ['visual', 'motor']
  nivelesAcceso: string[];   // Guardará valores como: ['high', 'medium']
  categorias: string[];      // Guardará valores como: ['Naturaleza', 'Cultural']
}


interface SidebarFiltrosProps {
  filtros: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onCleanFilter: () => void;
}

export function SidebarFiltros({ filtros, onFilterChange, onCleanFilter }: SidebarFiltrosProps) {
  

  const handleGroupChange = (group: keyof FilterState, newValues: string[]) => {
    
    onFilterChange({...filtros,[group]: newValues,});

  };

  return (
    <Box style={{ padding: '24px', background: 'white', borderRadius: '12px',width: '100%',maxWidth: '280px',display: 'flex',flexDirection: 'column',gap: '24px'}}>
     
      <Box>
        <Heading size="2" mb="3" style={{ color: '#333333', letterSpacing: '0.5px' }}>
          ACCESIBILIDAD
        </Heading>
        <CheckboxGroup.Root 
          value={filtros.accesibilidades} 
          onValueChange={(valores) => handleGroupChange('accesibilidades', valores)}>
          <Flex direction="column" gap="3">
            <CheckboxGroup.Item value="visual">Discapacidad visual</CheckboxGroup.Item>
            <CheckboxGroup.Item value="motor">Discapacidad motora</CheckboxGroup.Item>
            <CheckboxGroup.Item value="auditory">Discapacidad auditiva</CheckboxGroup.Item>
          </Flex>
        </CheckboxGroup.Root>
      </Box>

      <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0' }} />

      <Box>

        <Heading size="2" mb="3" style={{ color: '#333333', letterSpacing: '0.5px' }}>
          NIVEL DE ACCESO
        </Heading>
        <CheckboxGroup.Root value={filtros.nivelesAcceso} onValueChange={(valores) => handleGroupChange('nivelesAcceso', valores)}>

          <Flex direction="column" gap="3">
            <CheckboxGroup.Item value="high">
              <Flex align="center" gap="2">
                Acceso completo <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e2f7ed' }} />
              </Flex>
            </CheckboxGroup.Item>

            <CheckboxGroup.Item value="medium">
              <Flex align="center" gap="2">
                Acceso parcial <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fff3e0' }} />
              </Flex>
            </CheckboxGroup.Item>

            <CheckboxGroup.Item value="low">
              <Flex align="center" gap="2">
                Sin acceso <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffebee' }} />
              </Flex>
            </CheckboxGroup.Item>

          </Flex>
        </CheckboxGroup.Root>
      </Box>

      <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0' }} />

      
      <Box>
        <Heading size="2" mb="3" style={{ color: '#333333', letterSpacing: '0.5px' }}>
          CATEGORÍA
        </Heading>
        <CheckboxGroup.Root 
          value={filtros.categorias} 
          onValueChange={(valores) => handleGroupChange('categorias', valores)}
        >
          <Flex direction="column" gap="3">
            <Flex justify="between" align="center" width="100%">
              <CheckboxGroup.Item value="Naturaleza">Naturaleza</CheckboxGroup.Item>
              <Text size="1" color="gray">128</Text>
            </Flex>
            <Flex justify="between" align="center" width="100%">
              <CheckboxGroup.Item value="Cultural">Cultural</CheckboxGroup.Item>
              <Text size="1" color="gray">94</Text>
            </Flex>
            <Flex justify="between" align="center" width="100%">
              <CheckboxGroup.Item value="Aventura">Aventura</CheckboxGroup.Item>
              <Text size="1" color="gray">67</Text>
            </Flex>
            <Flex justify="between" align="center" width="100%">
              <CheckboxGroup.Item value="Gastronomía">Gastronomía</CheckboxGroup.Item>
              <Text size="1" color="gray">51</Text>
            </Flex>
          </Flex>
        </CheckboxGroup.Root>
      </Box>

      
      <Button 
        variant="outline" 
        style={{ 
          color: '#2b8a6a', 
          borderColor: '#2b8a6a',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          marginTop: '8px'
        }}
        onClick={onCleanFilter}
      >
        Limpiar todos los filtros
      </Button>
    </Box>
  );
}