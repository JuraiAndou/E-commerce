--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    id integer NOT NULL,
    descricao character varying NOT NULL
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- Name: CATEGORIA_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CATEGORIA_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."CATEGORIA_id_seq" OWNER TO postgres;

--
-- Name: CATEGORIA_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CATEGORIA_id_seq" OWNED BY public.categoria.id;


--
-- Name: produto_categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produto_categoria (
    id_produto integer NOT NULL,
    id_categoria integer NOT NULL
);


ALTER TABLE public.produto_categoria OWNER TO postgres;

--
-- Name: PRODUTO_CATEGORIA_id_categoria_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PRODUTO_CATEGORIA_id_categoria_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PRODUTO_CATEGORIA_id_categoria_seq" OWNER TO postgres;

--
-- Name: PRODUTO_CATEGORIA_id_categoria_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PRODUTO_CATEGORIA_id_categoria_seq" OWNED BY public.produto_categoria.id_categoria;


--
-- Name: PRODUTO_CATEGORIA_id_produto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PRODUTO_CATEGORIA_id_produto_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PRODUTO_CATEGORIA_id_produto_seq" OWNER TO postgres;

--
-- Name: PRODUTO_CATEGORIA_id_produto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PRODUTO_CATEGORIA_id_produto_seq" OWNED BY public.produto_categoria.id_produto;


--
-- Name: produto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produto (
    id integer NOT NULL,
    descricao character varying NOT NULL,
    preco double precision NOT NULL,
    foto json,
    quantidade integer NOT NULL
);


ALTER TABLE public.produto OWNER TO postgres;

--
-- Name: PRODUTO_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PRODUTO_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PRODUTO_id_seq" OWNER TO postgres;

--
-- Name: PRODUTO_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PRODUTO_id_seq" OWNED BY public.produto.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying NOT NULL,
    user_adress character varying NOT NULL,
    user_email character varying NOT NULL,
    user_password character varying NOT NULL,
    user_admin boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: USUARIO_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."USUARIO_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."USUARIO_id_seq" OWNER TO postgres;

--
-- Name: USUARIO_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."USUARIO_id_seq" OWNED BY public.users.user_id;


--
-- Name: venda_produto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.venda_produto (
    id_venda integer NOT NULL,
    id_produto integer NOT NULL,
    quantidade integer NOT NULL
);


ALTER TABLE public.venda_produto OWNER TO postgres;

--
-- Name: VENDA_PRODUTO_id_produto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."VENDA_PRODUTO_id_produto_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."VENDA_PRODUTO_id_produto_seq" OWNER TO postgres;

--
-- Name: VENDA_PRODUTO_id_produto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."VENDA_PRODUTO_id_produto_seq" OWNED BY public.venda_produto.id_produto;


--
-- Name: VENDA_PRODUTO_id_venda_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."VENDA_PRODUTO_id_venda_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."VENDA_PRODUTO_id_venda_seq" OWNER TO postgres;

--
-- Name: VENDA_PRODUTO_id_venda_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."VENDA_PRODUTO_id_venda_seq" OWNED BY public.venda_produto.id_venda;


--
-- Name: venda; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.venda (
    id integer NOT NULL,
    data_hora character varying NOT NULL,
    id_usuario integer NOT NULL
);


ALTER TABLE public.venda OWNER TO postgres;

--
-- Name: venda_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.venda_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.venda_id_seq OWNER TO postgres;

--
-- Name: venda_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.venda_id_seq OWNED BY public.venda.id;


--
-- Name: venda_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.venda_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.venda_id_usuario_seq OWNER TO postgres;

--
-- Name: venda_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.venda_id_usuario_seq OWNED BY public.venda.id_usuario;


--
-- Name: categoria id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public."CATEGORIA_id_seq"'::regclass);


--
-- Name: produto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto ALTER COLUMN id SET DEFAULT nextval('public."PRODUTO_id_seq"'::regclass);


--
-- Name: produto_categoria id_produto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto_categoria ALTER COLUMN id_produto SET DEFAULT nextval('public."PRODUTO_CATEGORIA_id_produto_seq"'::regclass);


--
-- Name: produto_categoria id_categoria; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto_categoria ALTER COLUMN id_categoria SET DEFAULT nextval('public."PRODUTO_CATEGORIA_id_categoria_seq"'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public."USUARIO_id_seq"'::regclass);


--
-- Name: venda id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda ALTER COLUMN id SET DEFAULT nextval('public.venda_id_seq'::regclass);


--
-- Name: venda id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda ALTER COLUMN id_usuario SET DEFAULT nextval('public.venda_id_usuario_seq'::regclass);


--
-- Name: venda_produto id_venda; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda_produto ALTER COLUMN id_venda SET DEFAULT nextval('public."VENDA_PRODUTO_id_venda_seq"'::regclass);


--
-- Name: venda_produto id_produto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda_produto ALTER COLUMN id_produto SET DEFAULT nextval('public."VENDA_PRODUTO_id_produto_seq"'::regclass);


--
-- Name: categoria CATEGORIA_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT "CATEGORIA_pkey" PRIMARY KEY (id);


--
-- Name: produto_categoria PRODUTO_CATEGORIA_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto_categoria
    ADD CONSTRAINT "PRODUTO_CATEGORIA_pkey" PRIMARY KEY (id_produto, id_categoria);


--
-- Name: produto PRODUTO_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto
    ADD CONSTRAINT "PRODUTO_pkey" PRIMARY KEY (id);


--
-- Name: users USUARIO_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "USUARIO_pkey" PRIMARY KEY (user_id);


--
-- Name: venda_produto VENDA_PRODUTO_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda_produto
    ADD CONSTRAINT "VENDA_PRODUTO_pkey" PRIMARY KEY (id_venda, id_produto);


--
-- Name: venda venda_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda
    ADD CONSTRAINT venda_pkey PRIMARY KEY (id_usuario);


--
-- Name: produto_categoria id_categoria; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto_categoria
    ADD CONSTRAINT id_categoria FOREIGN KEY (id_categoria) REFERENCES public.categoria(id);


--
-- Name: venda_produto id_produto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda_produto
    ADD CONSTRAINT id_produto FOREIGN KEY (id_produto) REFERENCES public.produto(id);


--
-- Name: produto_categoria id_produto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto_categoria
    ADD CONSTRAINT id_produto FOREIGN KEY (id_produto) REFERENCES public.produto(id);


--
-- Name: venda id_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda
    ADD CONSTRAINT id_usuario FOREIGN KEY (id_usuario) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

