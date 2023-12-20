// src/components/RegisterForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import {
  TextInputMask,
  celPhoneMask,
  cpfMask,
  customMask,
} from "react-masked-text";

interface FormData {
  email: string;
  password: string;

  name: string;
  phone: string;
  cpf: string;

  cep: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  complement: string;
}

const RegisterForm: React.FC = () => {
  const { register, setValue, setFocus } = useForm<FormData>();

  const checkCEP = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue("cep", data.cep);
        setValue("street", data.logradouro);
        setValue("district", data.bairro);
        setValue("city", data.localidade);
        setValue("state", data.uf);
        setFocus("number");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-700 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-100">Registro</h2>
      <form>
        {/* Registro */}
        <div className="grid grid-cols-5 gap-4">
          <div className="mb-4 col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              placeholder="name@email.com"
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4 col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200"
            >
              Senha
            </label>
            <input
              placeholder="password"
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>

        {/* Informações pessoais */}
        <h3 className="text-xl font-semibold mb-2 text-gray-100 opacity-60">
          Informações Pessoais
        </h3>
        {/* NAME */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-200"
          >
            Nome
          </label>
          <input
            placeholder="Joao da Silva"
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* CPF & PHONE */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="cpf"
              className="block text-sm font-medium text-gray-200"
            >
              CPF
            </label>
            <TextInputMask
              mask={cpfMask()}
              placeholder="999.888.777-14"
              id="cpf"
              name="cpf"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          {/* PHONE */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-200"
            >
              Telefone
            </label>
            <TextInputMask
              mask={celPhoneMask()}
              placeholder="(88) 99999-9999"
              id="phone"
              name="phone"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>

        {/* Localização */}
        <h3 className="text-xl font-semibold mb-2 text-gray-100 opacity-60">
          Endereço
        </h3>

        {/* CEP & STATE */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="cep"
              className="block text-sm font-medium text-gray-200"
            >
              CEP
            </label>
            <TextInputMask
              type="text"
              {...register("cep")}
              mask={customMask("99999-999")}
              placeholder="62100-000"
              id="cep"
              name="cep"
              className="mt-1 p-2 w-full border rounded-md"
              onBlur={checkCEP}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-200"
            >
              Estado
            </label>
            <input
              type="text"
              placeholder="CE"
              {...register("state")}
              id="state"
              name="state"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>

        {/* CITY & DISTRICT */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-200"
            >
              Cidade
            </label>
            <input
              type="text"
              placeholder="Sobral"
              {...register("city")}
              id="city"
              name="city"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-200"
            >
              Bairro
            </label>
            <input
              type="text"
              placeholder="Centro"
              {...register("district")}
              id="district"
              name="district"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="street"
            className="block text-sm font-medium text-gray-200"
          >
            Rua
          </label>
          <input
            type="text"
            placeholder="Rua Joao Gomes"
            {...register("street")}
            id="street"
            name="street"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* NUMBER & COMPLEMENT */}
        <div className="grid grid-cols-3 gap-4">
          <div className="mb-4">
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-200"
            >
              Número
            </label>
            <input
              type="text"
              placeholder="123"
              {...register("number")}
              id="number"
              name="number"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4 col-span-2">
            <label
              htmlFor="complement"
              className="block text-sm font-medium text-gray-200"
            >
              Complemento
            </label>
            <input
              placeholder="Lado Impar"
              type="text"
              id="complement"
              name="complement"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 mt-4 rounded-md w-full"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
